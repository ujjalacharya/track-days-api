provider "aws" {
  region = "us-east-1"  # Choose your desired AWS region
}

# Create a security group that allows SSH (port 22) and HTTP (port 3000)
resource "aws_security_group" "allow_ssh_http" {
  name        = "allow_ssh_http"
  description = "Allow inbound SSH and HTTP traffic"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH from any IP address
  }

   ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTP from any IP address
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTP from any IP address
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create an EC2 key pair (make sure to replace with your actual key)
resource "aws_key_pair" "my_key" {
  key_name   = "my-key"
  public_key = file("~/.ssh/id_rsa.pub")  # Path to your SSH public key
}

# Create an EC2 instance (t2.micro, which is eligible for the free tier)
resource "aws_instance" "example" {
  ami           = "ami-04b4f1a9cf54c11d0"  # Ubuntu Server 20.04 LTS AMI for us-east-1
  instance_type = "t2.micro"                # This is free-tier eligible
  key_name      = aws_key_pair.my_key.key_name
  security_groups = [aws_security_group.allow_ssh_http.name]

  # User data script to set up the environment and run the NestJS project
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y git nginx
              curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
              sudo apt-get install -y nodejs
              sudo npm install -g pm2

              # Clone the repository
              git clone https://github.com/ujjalacharya/track-days-api.git /home/ubuntu/track_days_api
              cd /home/ubuntu/track_days_api
              sudo touch .env 

              # Install dependencies and build the project
              sudo npm install --force
              sudo npm run build

              # Start the application using PM2
              sudo pm2 start dist/main.js --name "nestjs-app"
              sudo pm2 startup
              sudo pm2 save
              
               # Configure Nginx
              sudo rm /etc/nginx/sites-enabled/default
              sudo bash -c 'cat > /etc/nginx/sites-available/nestjs-app <<EOL
              server {
                  listen 80;
                  server_name _;
                  location / {
                      proxy_pass http://localhost:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \$host;
                      proxy_cache_bypass \$http_upgrade;
                  }
              }
              EOL'
              sudo ln -s /etc/nginx/sites-available/nestjs-app /etc/nginx/sites-enabled/
              sudo systemctl restart nginx
              EOF

  # Optional: Add a name to the instance for identification
  tags = {
    Name = "MyFreeEC2Instance"
  }
}

# Output the public IP of the created EC2 instance
output "instance_public_ip" {
  value = aws_instance.example.public_ip
}