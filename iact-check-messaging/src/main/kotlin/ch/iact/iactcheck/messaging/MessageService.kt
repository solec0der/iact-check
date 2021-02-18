package ch.iact.iactcheck.messaging

interface MessageService<T1, T2> {
    fun sendMessage(settings: T1, recipient: T2, message: Message);
}
