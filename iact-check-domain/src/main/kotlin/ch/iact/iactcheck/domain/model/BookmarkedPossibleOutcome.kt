package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "bookmarked_possible_outcome")
data class BookmarkedPossibleOutcome(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val submission: Submission,

    @ManyToOne
    val possibleOutcome: PossibleOutcome
)
