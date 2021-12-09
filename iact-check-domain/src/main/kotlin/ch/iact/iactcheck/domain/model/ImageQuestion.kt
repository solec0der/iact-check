package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "image_question")
data class ImageQuestion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val questionText: String,

    @OneToMany(
        targetEntity = ImageAnswer::class,
        mappedBy = "imageQuestion",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val imageAnswers: List<ImageAnswer>,

    @OneToMany(
        targetEntity = ImageQuestionAnswer::class,
        mappedBy = "imageQuestion",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val imageQuestionAnswers: List<ImageQuestionAnswer> = emptyList(),

    @ManyToOne
    val questionCategory: QuestionCategory
)
