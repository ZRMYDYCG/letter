import request  from "@/utils/request"

enum API {
    INSERT_WALL = '/insertwall',
    INSERT_FEEDBACK = '/insertFeedback',
    INSERT_COMMENT = '/insertComment',
    DELETE_WALL = '/deleteWall',
    DELETE_FEEDBACK = '/deleteFeedback',
    DELETE_COMMENT = '/deleteComment',
    GET_WALLS = '/getWalls',
    GET_COMMENTS = '/getComments'
}

export const insertWall = (data: any) => {
    return request.post(API.INSERT_WALL, data);
};

export const insertFeedback = (data: any) => {
    return request.post(API.INSERT_FEEDBACK, data);
};

export const insertComment = (data: any) => {
    return request.post(API.INSERT_COMMENT, data);
};

export const deleteWall = (data: any) => {
    return request.post(API.DELETE_WALL, data);
};

export const deleteFeedback = (data: any) => {
    return request.post(API.DELETE_FEEDBACK, data);
};

export const deleteComment = (data: any) => {
    return request.post(API.DELETE_COMMENT, data);
};

export const getWalls = (data: any) => {
    return request.post(API.GET_WALLS, data);
};

export const getComments = (data: any) => {
    return request.post(API.GET_COMMENTS, data);
};
