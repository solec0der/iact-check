package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "user")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val username: String,
        val password: String,

        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(
                name = "user_role",
                joinColumns = [JoinColumn(name = "user_id")],
                inverseJoinColumns = [JoinColumn(name = "role_id")]
        )
        val roles: Set<Role>,

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                name = "user_customer",
                joinColumns = [JoinColumn(name = "user_id")],
                inverseJoinColumns = [JoinColumn(name = "customer_id")]
        )
        val accessibleCustomers: List<Customer>
)
