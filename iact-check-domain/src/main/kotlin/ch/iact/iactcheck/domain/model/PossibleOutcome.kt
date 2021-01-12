package ch.iact.iactcheck.domain.model

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
    val youtubeUrl: String? = null,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val thumbnail: ByteArray? = ByteArray(0),

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val pdf: ByteArray? = ByteArray(0),

    @ManyToOne
    val questionCategory: QuestionCategory,

    @OneToMany(
        targetEntity = PossibleScore::class,
        mappedBy = "possibleOutcome",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val possibleScores: List<PossibleScore>
)
