package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "user_registration_field")
data class UserRegistrationField(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val fieldName: String,
    val required: Boolean,

    @OneToMany(targetEntity = ActiveUserRegistrationField::class, mappedBy = "userRegistrationField")
    val activeUserRegistrationFields: Set<ActiveUserRegistrationField>

)
