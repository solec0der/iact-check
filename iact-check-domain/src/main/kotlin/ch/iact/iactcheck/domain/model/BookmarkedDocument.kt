package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "bookmarked_document")
data class BookmarkedDocument(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val submission: Submission,

    @ManyToOne
    val document: Document
)
