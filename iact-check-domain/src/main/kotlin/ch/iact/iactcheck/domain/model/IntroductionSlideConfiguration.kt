package ch.iact.iactcheck.domain.model

import javax.persistence.*

@Entity
@Table(name = "introduction_slide_configuration")
data class IntroductionSlideConfiguration(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val showIntroductionSlide: Boolean,
    val title: String? = null,
    val subtitle: String? = null,
    val text: String? = null,

    @OneToOne
    @JoinColumn(name = "check_id")
    val check: Check
)
