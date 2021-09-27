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

    @ElementCollection(targetClass = Language::class)
    @CollectionTable(name = "check_required_language", joinColumns = [JoinColumn(name = "check_id")])
    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    val requiredLanguages: Set<Language>,

    val activeFrom: Instant,
    val activeTo: Instant,

    @OneToMany(targetEntity = QuestionCategory::class, mappedBy = "check", cascade = [CascadeType.ALL])
    val questionCategories: List<QuestionCategory>,

    @OneToMany(
        targetEntity = Submission::class,
        mappedBy = "check",
        cascade = [CascadeType.ALL],
        orphanRemoval = true
    )
    val submissions: List<Submission>
)
