package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "customer_branding")
data class CustomerBranding(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val primaryColour: String,
    val backgroundColour: String,
    val accentColour: String,
    val textColour: String,
    val font: String,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val logo: ByteArray = ByteArray(0),

    @OneToOne
    @JoinColumn(name = "customer_id")
    val customer: Customer
)
