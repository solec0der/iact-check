package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "range_question_answer")
data class RangeQuestionAnswer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val submission: Submission,

    @ManyToOne
    val rangeQuestion: RangeQuestion,
    val value: Int
)
