package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "document")
data class Document(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val file: ByteArray = ByteArray(0),

    val mediaType: String,

    @ManyToOne
    val documentGroup: DocumentGroup
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Document

        if (id != other.id) return false
        if (title != other.title) return false
        if (!file.contentEquals(other.file)) return false
        if (documentGroup != other.documentGroup) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + title.hashCode()
        result = 31 * result + file.contentHashCode()
        result = 31 * result + documentGroup.hashCode()
        return result
    }
}
