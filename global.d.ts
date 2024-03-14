interface MessageApi {
    success: (message: string) => void
    error: (message: string) => void
    warning: (message: string) => void
    info: (message: string) => void
}

interface Window {
    message: MessageApi
}