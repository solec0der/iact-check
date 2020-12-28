package ch.iact.iactcheck.domain.model

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "`check`")
data class Check(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        @ManyToOne
        val customer: Customer,
        val title: String,
        val activeFrom: Instant,
        val activeTo: Instant,

        @OneToMany(targetEntity = QuestionCategory::class, mappedBy = "check")
        val questionCategories: List<QuestionCategory>
)
