package ch.iact.iactcheck.domain.model

import ch.iact.iactcheck.domain.converter.TranslationsPersistenceConverter
import ch.iact.iactcheck.domain.model.common.Translations
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

    @Convert(converter = TranslationsPersistenceConverter::class)
    val title: Translations,

    @Convert(converter = TranslationsPersistenceConverter::class)
    val subtitle: Translations,

    @ElementCollection(targetClass = Language::class)
    @CollectionTable(name = "check_required_language", joinColumns = [JoinColumn(name = "check_id")])
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    val requiredLanguages: Set<Language>,

    @Enumerated(EnumType.STRING)
    val defaultLanguage: Language,

    val activeFrom: Instant,
    val activeTo: Instant,

    @OneToMany(targetEntity = QuestionCategory::class, mappedBy = "check", cascade = [CascadeType.ALL])
    val questionCategories: List<QuestionCategory>,

    @OneToOne(mappedBy = "check", cascade = [CascadeType.ALL], orphanRemoval = true)
    val marketplaceConfig: MarketplaceConfig?,

    @OneToOne(mappedBy = "check", cascade = [CascadeType.ALL], orphanRemoval = true)
    val introductionSlideConfiguration: IntroductionSlideConfiguration?,

    @Convert(converter = TranslationsPersistenceConverter::class)
    val emailSubject: Translations?,

    @Convert(converter = TranslationsPersistenceConverter::class)
    val emailMessage: Translations?,

    @Convert(converter = TranslationsPersistenceConverter::class)
    val textMessage: Translations?,

    @OneToMany(
        targetEntity = Submission::class,
        mappedBy = "check",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val submissions: List<Submission>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Check

        if (id != other.id) return false
        if (title != other.title) return false
        if (subtitle != other.subtitle) return false
        if (defaultLanguage != other.defaultLanguage) return false
        if (activeFrom != other.activeFrom) return false
        if (activeTo != other.activeTo) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + title.hashCode()
        result = 31 * result + subtitle.hashCode()
        result = 31 * result + defaultLanguage.hashCode()
        result = 31 * result + activeFrom.hashCode()
        result = 31 * result + activeTo.hashCode()
        return result
    }

    override fun toString(): String {
        return "Check(id=$id, title=$title, subtitle=$subtitle, defaultLanguage=$defaultLanguage, activeFrom=$activeFrom, activeTo=$activeTo)"
    }
}
