import debug from 'debug';

const debugKey = 'FUTILITY';
const colors = {
    trace: 'turquoise',
    debug: 'grey',
    info: 'blue',
    warn: 'orange',
    error: 'red'
};

// Enable logging by adding the key to local storage
if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('debug', `${debugKey}:*`);
}

class Log {
    generateMessage(level, message, source) {
        // Set the prefix which will cause debug to enable the message
        const namespace = `${debugKey}:${level}`;
        const createDebug = debug(namespace);

        // Set the colour of the message based on the level
        createDebug.color = colors[level];

        if (source) {
            createDebug(source, message);
        } else {
            createDebug(message);
        }
    }

    trace(message, source) {
        return this.generateMessage('trace', message, source);
    }

    debug(message, source) {
        return this.generateMessage('debug', message, source);
    }

    info(message, source) {
        return this.generateMessage('info', message, source);
    }

    warn(message, source) {
        return this.generateMessage('warn', message, source);
    }

    error(message, source) {
        return this.generateMessage('error', message, source);
    }
}

export default new Log();