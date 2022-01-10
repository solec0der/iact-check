package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "displayed_document_group")
data class DisplayedDocumentGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val position: Int,

    @OneToOne
    val documentGroup: DocumentGroup,

    @ManyToOne
    val marketplaceTileConfig: MarketplaceTileConfig
)
