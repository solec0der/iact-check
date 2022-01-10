package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "document")
data class Document(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val position: Int,
    val title: String,
    val mediaType: String,

    @ManyToOne
    val documentGroup: DocumentGroup
) {
    override fun toString(): String {
        return "Document(id=$id, position=$position, title='$title', mediaType='$mediaType')"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Document

        if (id != other.id) return false
        if (position != other.position) return false
        if (title != other.title) return false
        if (mediaType != other.mediaType) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + position
        result = 31 * result + title.hashCode()
        result = 31 * result + mediaType.hashCode()
        return result
    }
}
