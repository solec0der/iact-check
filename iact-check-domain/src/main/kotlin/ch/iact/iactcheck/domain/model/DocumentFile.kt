package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "document_file")
data class DocumentFile(

    @Id
    @Column(name = "document_id")
    val id: Long,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val file: ByteArray,

    @OneToOne
    @MapsId
    @JoinColumn(name = "document_id")
    val document: Document
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as DocumentFile

        if (id != other.id) return false
        if (!file.contentEquals(other.file)) return false
        if (document != other.document) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + file.contentHashCode()
        result = 31 * result + document.hashCode()
        return result
    }
}
