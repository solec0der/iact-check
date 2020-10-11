package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "role")
data class Role(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,

        @ManyToMany(mappedBy = "roles")
        val users: Set<User>
)
