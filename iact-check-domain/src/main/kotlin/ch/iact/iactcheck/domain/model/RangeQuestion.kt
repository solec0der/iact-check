package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "range_question")
data class RangeQuestion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val questionText: String,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val icon: ByteArray = ByteArray(0),

    @OneToMany(
        targetEntity = RangeStep::class,
        mappedBy = "rangeQuestion",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val rangeSteps: List<RangeStep>,

    @OneToMany(
        targetEntity = RangeQuestionAnswer::class,
        mappedBy = "rangeQuestion",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val rangeQuestionAnswer: List<RangeQuestionAnswer>,

    @ManyToOne
    val questionCategory: QuestionCategory
)
