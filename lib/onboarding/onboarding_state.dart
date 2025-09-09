import 'package:flutter/material.dart';

class OnboardingState extends ChangeNotifier {
  int _currentPage = 0;
  PageController pageController = PageController();

  int get currentPage => _currentPage;

  void setPage(int index) {
    if (_currentPage == index) return;
    _currentPage = index;
    notifyListeners();
  }

  Future<void> nextPage() async {
    final int next = _currentPage + 1;
    await pageController.animateToPage(
      next,
      duration: const Duration(milliseconds: 360),
      curve: Curves.easeOutCubic,
    );
  }
}

