package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "customer")
data class Customer(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,
        val primaryColour: String,
        val accentColour: String,
        @Lob
        @Basic(fetch = FetchType.LAZY)
        val logo: ByteArray = ByteArray(0),

        @ElementCollection
        @Column(name = "userId")
        @CollectionTable(name = "users_customer_access", joinColumns = [JoinColumn(name = "customer_id")])
        val usersWithAccess: Set<String>,

        @OneToMany(targetEntity = Check::class, mappedBy = "customer")
        val checks: List<Check>
) {
    override fun toString(): String {
        return "Customer(id=$id, name='$name', primaryColour='$primaryColour', accentColour='$accentColour')"
    }
}
