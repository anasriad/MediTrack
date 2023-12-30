import logger from 'pino'
import dayjs from 'dayjs'
import pretty from 'pino-pretty'
const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    level: 'info',
    base: {
        pid: false
    },
    timestamp: () => ` ,"Time": ${dayjs().format()}`,
}, pretty())

export default log