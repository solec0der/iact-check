package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "image_answer")
data class ImageAnswer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    val imageQuestion: ImageQuestion,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    val image: ByteArray = ByteArray(0),

    val score: Int
)
