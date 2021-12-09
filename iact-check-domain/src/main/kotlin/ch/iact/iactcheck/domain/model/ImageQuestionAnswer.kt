package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "image_question_answer")
data class ImageQuestionAnswer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val submission: Submission,

    @ManyToOne
    val imageAnswer: ImageAnswer,

    val value: Int
)
