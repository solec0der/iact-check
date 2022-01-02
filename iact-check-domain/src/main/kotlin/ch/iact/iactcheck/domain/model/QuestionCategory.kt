package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "question_category")
data class QuestionCategory(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val thumbnail: ByteArray = ByteArray(0),

    @ManyToOne
    val check: Check,

    @Enumerated(EnumType.STRING)
    val language: Language,

    val numberOfPossibleOutcomesToShow: Int,

    @OneToMany(targetEntity = RangeQuestion::class, mappedBy = "questionCategory")
    val rangeQuestions: List<RangeQuestion>,

    @OneToMany(targetEntity = ImageQuestion::class, mappedBy = "questionCategory")
    val imageQuestions: List<ImageQuestion>,

    @OneToMany(targetEntity = PossibleOutcome::class, mappedBy = "questionCategory")
    val possibleOutcomes: List<PossibleOutcome>
)
