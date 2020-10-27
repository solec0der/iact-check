package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "question")
data class Question(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val questionText: String,
        val minScore: Int,
        val maxScore: Int,

        @ManyToOne
        val questionCategory: QuestionCategory
)
