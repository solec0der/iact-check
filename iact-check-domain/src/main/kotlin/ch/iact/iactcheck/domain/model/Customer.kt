package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "customer")
data class Customer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,

    @ElementCollection
    @Column(name = "user_id")
    @CollectionTable(name = "user_customer_access", joinColumns = [JoinColumn(name = "customer_id")])
    val usersWithAccess: Set<String>,

    @OneToOne(mappedBy = "customer", cascade = [CascadeType.ALL], orphanRemoval = true)
    val customerBranding: CustomerBranding?,

    @OneToOne(mappedBy = "customer", cascade = [CascadeType.ALL], orphanRemoval = true)
    val emailSettings: EmailSettings? = null,

    @OneToOne(mappedBy = "customer", cascade = [CascadeType.ALL], orphanRemoval = true)
    val textMessageSettings: TextMessageSettings? = null,

    @OneToMany(targetEntity = Check::class, mappedBy = "customer")
    val checks: List<Check>,

    @OneToMany(targetEntity = ActiveUserRegistrationField::class, mappedBy = "customer")
    val activeUserRegistrationFields: Set<ActiveUserRegistrationField>
) {
    override fun toString(): String {
        return "Customer(id=$id, name='$name')"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Customer

        if (id != other.id) return false
        if (name != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + name.hashCode()
        return result
    }
}
