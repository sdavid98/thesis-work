export const addComment = (content, commenter, time, position) => {
    return {
        type: 'NEWCOMMENT',
        comment: {
            content,
            time,
            commenter,
            position,
            id: Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join('')
        }
    }
};

export const deleteComment = (id) => {
    return {
        type: 'DELETECOMMENT',
        id
    }
};

export const savedComment = () => {
    return {
        type: 'UPDATECOMMENT'
    }
};

export const saveCommentsToStore = (comments) => {
    return {
        type: 'LOADFROMSERVER',
        comments
    }
};