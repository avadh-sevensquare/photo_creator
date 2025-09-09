import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// theme imported transitively where needed
import 'onboarding_state.dart';
import '../widgets/gradient_cta_button.dart';
import '../widgets/dots_indicator.dart';
import '../widgets/hero_card.dart';
import '../widgets/category_selector.dart';
import '../widgets/action_row.dart';
import '../widgets/gallery_preview.dart';

class OnboardingCarousel extends StatelessWidget {
  const OnboardingCarousel({super.key});

  @override
  Widget build(BuildContext context) {
    final onboarding = context.watch<OnboardingState>();
    final media = MediaQuery.of(context);
    final bool disableAnims = media.disableAnimations;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView(
                controller: onboarding.pageController,
                onPageChanged: onboarding.onPageChanged,
                physics: const BouncingScrollPhysics(),
                children: const [
                  _ScreenTryOn(pageIndex: 0),
                  _ScreenTransform(pageIndex: 1),
                  _ScreenSaveShare(pageIndex: 2),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Column(
                children: [
                  DotsIndicator(
                    count: 3,
                    activeIndex: onboarding.currentPage,
                    disableAnimations: disableAnims,
                  ),
                  const SizedBox(height: 16),
                  GradientCTAButton(
                    label: onboarding.currentPage == 2 ? 'Try Now' : 'Next',
                    onPressed: () => onboarding.nextPage(),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ScreenTryOn extends StatelessWidget {
  final int pageIndex;
  const _ScreenTryOn({required this.pageIndex});

  @override
  Widget build(BuildContext context) {
    final onboarding = context.watch<OnboardingState>();
    final textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
      child: Column(
        children: [
          Flexible(
            flex: 6,
            child: HeroCard(
              semanticsLabel: 'Before and After try on preview',
              parallaxController: onboarding.pageController,
              pageIndex: pageIndex,
              heightFactor: 0.45,
              child: TryOnHero(onboarding: onboarding),
            ),
          ),
          const SizedBox(height: 12),
          Flexible(
            flex: 2,
            child: Align(
              alignment: Alignment.center,
              child: CategorySelector(
                selected: onboarding.selectedCategory,
                onSelect: onboarding.selectCategory,
              ),
            ),
          ),
          const Spacer(),
          Text(
            '1-Click to Try On Trendy Outfits',
            style: textTheme.displayLarge,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: Text(
              'See yourself in the latest fashion instantly with our AI-powered try-on technology.',
              style: textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

class _ScreenTransform extends StatelessWidget {
  final int pageIndex;
  const _ScreenTransform({required this.pageIndex});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
      child: Column(
        children: [
          Flexible(
            flex: 6,
            child: HeroCard(
              semanticsLabel: 'Transform hero image',
              parallaxController: context.read<OnboardingState>().pageController,
              pageIndex: pageIndex,
              heightFactor: 0.45,
              child: const TransformHero(),
            ),
          ),
          const SizedBox(height: 12),
          const Flexible(flex: 2, child: Center(child: ActionRow())),
          const Spacer(),
          Text(
            'Transform any outfit with AI-Powered Customisation',
            style: textTheme.displayLarge,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: Text(
              'Make every look yours with smart adjustments and style swaps.',
              style: textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

class _ScreenSaveShare extends StatelessWidget {
  final int pageIndex;
  const _ScreenSaveShare({required this.pageIndex});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
      child: Column(
        children: [
          Flexible(
            flex: 6,
            child: HeroCard(
              semanticsLabel: 'Gallery preview',
              parallaxController: context.read<OnboardingState>().pageController,
              pageIndex: pageIndex,
              heightFactor: 0.45,
              child: const GalleryPreview(),
            ),
          ),
          const Spacer(),
          Text(
            'Save & Share Your Looks in Stunning Quality',
            style: textTheme.displayLarge,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: Text(
              'Capture, curate, and showcase your style with the world.',
              style: textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

