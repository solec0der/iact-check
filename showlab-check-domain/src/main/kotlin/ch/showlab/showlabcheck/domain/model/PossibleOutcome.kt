package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "possible_outcome")
data class PossibleOutcome(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val title: String,
        val subtitle: String,
        val description: String,

        @ManyToOne
        val questionCategory: QuestionCategory,

        @OneToMany(targetEntity = PossibleScore::class, mappedBy = "possibleOutcome")
        val possibleScores: List<PossibleScore>
)
