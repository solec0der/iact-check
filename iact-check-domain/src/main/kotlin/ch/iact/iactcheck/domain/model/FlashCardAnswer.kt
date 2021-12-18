package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "flash_card_answer")
data class FlashCardAnswer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val answer: String,
    val isCorrectAnswer: Boolean,

    @ManyToOne
    val flashCardQuestion: FlashCardQuestion,
)
