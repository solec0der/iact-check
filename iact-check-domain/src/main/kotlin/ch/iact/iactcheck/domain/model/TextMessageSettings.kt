package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "text_message_setting")
data class TextMessageSettings(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @OneToOne
    @JoinColumn(name = "customer_id")
    val customer: Customer,

    val accountSid: String,
    val authToken: String,
    val fromPhoneNumber: String

)
