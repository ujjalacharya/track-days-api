import { Header, HttpCode, UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiParamOptions,
    ApiQuery,
    ApiQueryOptions,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { HttpResponse } from '../types/httpResponse';

interface ICommonDecorator<TModel = any, TCls = any, TDto = any> {
    model: TModel;
    params?: ApiParamOptions[];
    query?: ApiQueryOptions[];
    respIsArray?: boolean;
    reqIsArray?: boolean;
    cls?: TCls;
    dto?: TDto;
    method?: string;
    summary?: string;
    needAuth?: boolean;
}

export function BodyCommonDecorator(props: ICommonDecorator) {
    let params = [];
    if (props.params) {
        params = props.params?.map((param) => ApiParam(param));
    }

    const SwaggerResponse = props.method === 'post' ? ApiCreatedResponse : ApiOkResponse;

    return applyDecorators(
        ApiBody({
            type: props.dto,
            required: true,
            isArray: props.reqIsArray,
        }),
        ApiOperation({ summary: props.summary }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
        }),
        ...params,
        SwaggerResponse({
            type: props.model,
            isArray: props.respIsArray,
        }),
    );
}

export function CommonDecorator(props: ICommonDecorator) {

    props.needAuth = props.needAuth ?? true;
    let params = [];
    let query = [];
    if (props.params) {
        params = props.params?.map((param) => ApiParam(param));
    }

    if (props.query) {
        query = props.query?.map((query) => ApiQuery(query));
    }

    return applyDecorators(
        ApiOkResponse({
            type: props.model,
            isArray: props.respIsArray,
        }),
        ApiOperation({ summary: props.summary }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
        }),
        ...(props.needAuth
            ? []
            : []),
        ...params,
        ...query,
    );
}

export function CommonDeleteDecorator(props: ICommonDecorator) {
    let params = [];
    if (props.params) {
        params = props.params?.map((param) => ApiParam(param));
    }

    return applyDecorators(
        HttpCode(204),
        ApiNoContentResponse({ description: 'Deleted successfully' }),
        ApiOperation({ summary: props.summary }),
        ApiBearerAuth('CommonIAM-JWT'),
        ApiUnauthorizedResponse({ description: 'Authentication error'}),
        ApiNotFoundResponse({ description: 'Not found error'}),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
        }),
        ...params,
    );
}
