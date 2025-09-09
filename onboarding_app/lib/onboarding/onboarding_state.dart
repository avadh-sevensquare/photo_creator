import 'package:flutter/material.dart';

enum OutfitCategory { dress, glasses, hat, bag }

class OnboardingState extends ChangeNotifier {
  final PageController pageController = PageController();
  int currentPage = 0;

  OutfitCategory? selectedCategory;

  void onPageChanged(int index) {
    currentPage = index;
    notifyListeners();
  }

  Future<void> nextPage() async {
    if (currentPage < 2) {
      await pageController.animateToPage(
        currentPage + 1,
        duration: const Duration(milliseconds: 420),
        curve: Curves.easeOutCubic,
      );
    }
  }

  void selectCategory(OutfitCategory category) {
    selectedCategory = category;
    notifyListeners();
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }
}

