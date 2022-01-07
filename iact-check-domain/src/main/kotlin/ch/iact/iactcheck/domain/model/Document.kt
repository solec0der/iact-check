package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "document")
data class Document(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,
    val mediaType: String,

    @ManyToOne
    val documentGroup: DocumentGroup
)
