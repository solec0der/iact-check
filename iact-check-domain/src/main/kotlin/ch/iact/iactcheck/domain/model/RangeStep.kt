package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "range_step")
data class RangeStep(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,

        @ManyToOne
        val rangeQuestion: RangeQuestion,

        val score: Int,
        val description: String?
)
