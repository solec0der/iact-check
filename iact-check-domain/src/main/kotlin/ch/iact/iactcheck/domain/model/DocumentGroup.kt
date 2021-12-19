package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "document_group")
data class DocumentGroup(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val backgroundColour: String? = null,

    @OneToMany(
        targetEntity = Document::class,
        mappedBy = "documentGroup",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val documents: List<Document>,

    @ManyToOne
    val check: Check
) {
}
