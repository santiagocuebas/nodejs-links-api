export const getErrorMessages = (errs) => {
    const message = {};
    for (const e of errs) {
        if (e.type === 'field')
            message[e.path] = e.msg;
    }
    return message;
};
