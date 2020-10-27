package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "possible_score")
data class PossibleScore(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val score: Int,

        @ManyToOne
        val possibleOutcome: PossibleOutcome
)
