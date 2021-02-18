package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "email_setting")
data class EmailSettings(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @OneToOne
    @JoinColumn(name = "customer_id")
    val customer: Customer,

    val sendEmails: Boolean,
    val smtpHost: String,
    val smtpPort: Int,
    val smtpUsername: String,
    val smtpPassword: String,
    val smtpTransportStrategy: SmtpTransportStrategy,
    val fromAddress: String,
    val fromName: String
)
