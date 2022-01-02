package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "flash_card_question")
data class FlashCardQuestion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val question: String,
    val allowMultipleAnswers: Boolean,
    val requiredQuestion: Boolean,

    @OneToMany(
        targetEntity = FlashCardAnswer::class,
        mappedBy = "flashCardQuestion",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val answers: List<FlashCardAnswer>,

    @ManyToOne
    val check: Check
) {
    override fun toString(): String {
        return "FlashCardQuestion(id=$id, question='$question', allowMultipleAnswers=$allowMultipleAnswers, answers=$answers)"
    }
}
