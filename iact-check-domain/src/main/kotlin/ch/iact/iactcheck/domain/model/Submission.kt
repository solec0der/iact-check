package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "submission")
data class Submission(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val check: Check,

    val firstName: String,
    val lastName: String,
    val street: String,
    val zipCode: String,
    val city: String,
    val phoneNumber: String,
    val email: String
)
