import { Request } from 'express';

export interface RequestOverride extends Request {
  user: {
    sub: number;
  };
}
