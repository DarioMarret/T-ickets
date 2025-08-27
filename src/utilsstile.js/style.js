export const index = {
    backgroundColor: "#311C7C"
}
export function logWithCallback(message, typo = "log") {
   // if (true) return ""
    switch (typo) {
        case "error":
            console.error(message)
            break
        case "ingo":
            console.info(message)
            break
        case "warning":
            console.warn(message)
            break
        default:
            console.log(message)
            break
    }
}
