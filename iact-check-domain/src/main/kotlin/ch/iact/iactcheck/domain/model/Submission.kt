package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "submission")
data class Submission(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val check: Check,

    val firstName: String,
    val lastName: String,
    val street: String,
    val zipCode: String,
    val city: String,
    val phoneNumber: String,
    val email: String,

    @OneToMany(
        targetEntity = RangeQuestionAnswer::class,
        mappedBy = "submission",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val rangeQuestionAnswers: List<RangeQuestionAnswer> = emptyList(),

    @OneToMany(
        targetEntity = ImageQuestionAnswer::class,
        mappedBy = "submission",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val imageQuestionAnswers: List<ImageQuestionAnswer> = emptyList(),

    @OneToMany(
        targetEntity = BookmarkedPossibleOutcome::class,
        mappedBy = "submission",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val bookmarkedPossibleOutcomes: List<BookmarkedPossibleOutcome> = emptyList(),

    @OneToMany(
        targetEntity = BookmarkedDocument::class,
        mappedBy = "submission",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val bookmarkedDocuments: List<BookmarkedDocument> = emptyList()
)
