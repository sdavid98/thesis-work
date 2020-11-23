const comments = (state = {shouldSave: false, comments: []}, action) => {
    switch (action.type) {
        case 'NEWCOMMENT':
            return {
                shouldSave: true,
                comments: [
                    ...state.comments,
                    {
                        ...action.comment,
                        time: Date.now()
                    }
                ]
            };
        case 'DELETECOMMENT':
            return {
                shouldSave: true,
                comments: [
                    ...state.comments.filter(comment => comment.id !== action.id)
                ]
            };
        case 'LOADFROMSERVER':
            return {
                shouldSave: false,
                comments: [
                    ...action.comments
                ]
            };
        case 'SAVEDCOMMENT':
            return {
                ...state.comments,
                shouldSave: false
            };
        default:
            return state;
    }
};

export default comments;