package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "user_registration_field")
data class UserRegistrationField(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val fieldName: String,

    @OneToMany(targetEntity = ActiveUserRegistrationField::class, mappedBy = "userRegistrationField")
    val activeUserRegistrationFields: Set<ActiveUserRegistrationField>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as UserRegistrationField

        if (id != other.id) return false
        if (fieldName != other.fieldName) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + fieldName.hashCode()
        return result
    }
}
