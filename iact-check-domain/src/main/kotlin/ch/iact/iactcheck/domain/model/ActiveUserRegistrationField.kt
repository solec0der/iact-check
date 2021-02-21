package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "active_user_registration_field")
data class ActiveUserRegistrationField(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val userRegistrationField: UserRegistrationField,

    @ManyToOne
    val customer: Customer,

    val validationRegex: String
)
