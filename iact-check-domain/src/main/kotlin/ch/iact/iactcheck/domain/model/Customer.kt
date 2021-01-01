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

        @OneToOne(mappedBy = "customer", cascade = [CascadeType.ALL])
        @PrimaryKeyJoinColumn
        val customerBranding: CustomerBranding? = null,

        @OneToMany(targetEntity = Check::class, mappedBy = "customer")
        val checks: List<Check>
) {
    override fun toString(): String {
        return "Customer(id=$id, name='$name')"
    }
}
