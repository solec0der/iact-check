package ch.showlab.showlabcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "check")
data class Check(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        @ManyToOne
        val customer: Customer,
        val title: String,

        @OneToMany(targetEntity = QuestionCategory::class, mappedBy = "check")
        val questionCategories: List<QuestionCategory>
)
