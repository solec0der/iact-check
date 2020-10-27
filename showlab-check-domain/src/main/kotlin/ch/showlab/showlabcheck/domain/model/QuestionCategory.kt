package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "question_category")
data class QuestionCategory(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val title: String,

        @ManyToOne
        val check: Check,

        @OneToMany(targetEntity = Question::class, mappedBy = "questionCategory")
        val questions: List<Question>,

        @OneToMany(targetEntity = PossibleOutcome::class, mappedBy = "questionCategory")
        val possibleOutComes: List<PossibleOutcome>
)
